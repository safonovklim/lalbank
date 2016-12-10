module Api::V1
  class CardsController < ApiController
    def create
      authenticate_employee "security_staff"

      puts 'employee'
      logger.info @current_employee

      ncp = card_parameters # ncp is new card parameters
      logger.info ncp

      if is_currency_allowed(ncp['currency'])
        @bank_account = BankAccount.new
        @bank_account.type = "for_card"
        @bank_account.client_id = params[:user_id]
        @bank_account.amount = 0
        @bank_account.currency = ncp['currency']
        @bank_account.save!

        render json: {
            issued: true,
            bank_account: @bank_account
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