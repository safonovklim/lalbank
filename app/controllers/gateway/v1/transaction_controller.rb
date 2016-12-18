module Gateway::V1
  class TransactionController < GatewayController
    before_action only: [:thru_sexycard] {
      authenticate("sexycard")
    }

    def thru_sexycard
      # logger.info @transaction
      # logger.info @transaction[:card_number]
      # @transaction contain input data: card_number, expire_at, pin_code, amount, currency, category
      card = Card
                 .select("cards.id, cards.card_number, cards.pin_hash,
                    bank_accounts.amount, bank_accounts.currency, bank_accounts.id as ba_id,
                    bank_accounts.transactions_success, bank_accounts.transactions_failed, clients.id as c_id")
                 .where('card_number = ?', @transaction[:card_number])
                 .where('expire_at = ?', @transaction[:expire_at])
                 .joins("INNER JOIN bank_accounts ON bank_accounts.id = cards.bank_account_id") # may be replace it to .joins(:bank_account)
                 .joins('INNER JOIN clients ON clients.id = bank_accounts.client_id')
                 .take
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

          # analytics
          dt = Time.now
          a = Analysis
                  .where(client_id: card[:c_id])
                  .where(transaction_category_id: t.transaction_category_id)
                  .where(year: dt.year)
                  .where(month: dt.month)
                  .where(currency: t.currency)
                  .first_or_create
          a[:amount] += t.amount
          a[:total_transactions] += 1
          a.save!

          # change amount
          BankAccount.update(t.bank_account_id,
                             :amount => card[:amount] + t.amount,
                             :transactions_success => card[:transactions_success] + 1)
          render json: {
              transaction_completed: true
          }
        end
        t.save!
        if t.status == "declined"
          BankAccount.update(t.bank_account_id, :transactions_failed => card[:transactions_failed] + 1)
        end
      end


    end

    def render_transaction_fail(reason = '')
      render json: {
          transaction_completed: false,
          message: reason
      }, status: :bad_request
    end




  end
end

