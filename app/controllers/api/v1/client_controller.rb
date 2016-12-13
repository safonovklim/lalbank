module Api::V1
  class ClientController < ApiController
    before_action :authenticate_client, only: [:index]

    def index
      render json: {
          client: @current_client
      }
    end

    def create
      @client = Client.new(client_params)
      if @client.valid?
        @client.save
        render json: {
            created: true,
            approved: !(@client.status == "not_approved")
        }
      else
        render json: {
            :created => false,
            :errors => @client.errors.messages,
        }, :status => 400
      end
    end

    private
      def client_params
        params.require(:client).permit(:last_name, :first_name, :middle_name, :birth_at, :username, :password, :password_confirmation)
      end

  end
end
