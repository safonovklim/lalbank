module Gateway::V1
  class TransactionController < GatewayController
    before_action only: [:thru_sexycard] {
      authenticate("sexycard")
    }

    def thru_sexycard
      # logger.info @transaction
      # logger.info @transaction[:card_number]
      # @transaction contain input data: card_number, expire_at, pin_code, amount, currency, category
      card = Card.select("cards.id, cards.card_number, cards.pin_hash, bank_accounts.amount, bank_accounts.currency, bank_accounts.id as ba_id").where('card_number = ?', @transaction[:card_number]).where('expire_at = ?', @transaction[:expire_at]).joins("INNER JOIN bank_accounts ON bank_accounts.id = cards.bank_account_id").take
      if card.blank?
        render_transaction_fail "Unknown card"
      else
        t = Transaction.new
        t.bank_account_id = card[:ba_id]
        t.transaction_category_id = @transaction[:category]
        t.amount = BigDecimal(@transaction[:amount].to_s).round(2)
        t.currency = @transaction[:currency]

        if !(card.get_pin_hash(@transaction[:pin_code]) == card.pin_hash)
          t.status = :declined
          render_transaction_fail "Pin code incorrect"
        elsif !(card[:currency] == @transaction[:currency])
          t.status = :declined
          render_transaction_fail "Transaction currency doesn't match card currency"
        elsif !((card[:amount] + t.amount) > 0)
          t.status = :declined
          render_transaction_fail "Not enough money"
        else
          t.status = :completed
          BankAccount.update(t.bank_account_id, :amount => card[:amount] + t.amount)
          render json: {
              transaction_completed: true
          }
        end
        t.save!
      end


    end

    def render_transaction_fail(reason = '')
      render json: {
          transaction_completed: false,
          reason: reason
      }
    end




  end
end

