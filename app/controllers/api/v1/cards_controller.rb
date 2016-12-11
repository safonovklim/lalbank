module Api::V1
  class CardsController < ApiController
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
      bank_accounts = BankAccount.find_by_client_id(params[:user_id])
      render json: {
          client: Client.find(params[:user_id]),
          bank_accounts: bank_accounts
      }
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