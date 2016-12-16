module AdminApi::V1
  class BankAccountController < ApiController
    before_action :authenticate_employee, only: [:index]
    before_action :set_client, only: [:index]

    def index
      list = BankAccount
                  .where(client_id: @client[:id])


      render json: {
          bank_accounts: list
      }
    end
  end
end