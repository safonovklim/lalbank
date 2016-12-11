module Api::V1
  class CardController < ApiController
    before_action :authenticate_employee, only: [:index]
    before_action only: [:create] {
      authenticate_employee("security_staff")
    }

    def create
      ncp = card_parameters # ncp is new card parameters

      if is_currency_allowed(ncp['currency'])
        @bank_account = BankAccount.new
        @bank_account.reason = "for_card"
        @bank_account.client_id = params[:user_id]
        @bank_account.currency = ncp['currency']
        @bank_account.save!

        @card = Card.new
        @card.bank_account_id = @bank_account.id
        pin_code = @card.generate_card_details
        @card.save!


        render json: {
            issued: true,
            card: {
                number: @card.card_number,
                expire_at: @card.expire_at,
                pin: pin_code
            }
        }
      else
        render json: {
            issued: false,
            message: 'This currency not allowed'
        }
      end
    end

    def index
      client = Client.find(params[:user_id]) # find client (will return 404 http code if not found)
      cards = BankAccount.select("cards.id, cards.card_number, bank_accounts.amount, bank_accounts.currency").where('bank_accounts.client_id = ?', params[:user_id]).where('cards.status = 0').joins("INNER JOIN cards ON cards.bank_account_id = bank_accounts.id")
      render json: cards
    end

    private
      def card_parameters
        params.require(:card).permit(:currency)
      end

      def is_currency_allowed(currency)
        if currency == "RUB"
          true
        else
          false
        end
      end
  end
end