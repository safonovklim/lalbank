module Api::V1
  class ClientsController < ApiController
    before_action :authenticate_employee, only: [:index, :show, :update]
    before_action only: [:approve, :ban, :unban] {
      authenticate_employee("security_staff")
    }
    before_action :set_client, only: [:show, :update, :approve, :ban, :unban]

    def index
      @clients = Client.all
      render json: @clients
    end

    def show
      render json: @client
    end

    def update
      if @client.update(client_params)
        render json: @client
      else
        render json: @client.errors, status: 400
      end
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

    def approve
      change_status("not_approved", "activated")
    end

    def ban
      change_status("activated", "banned")
    end

    def unban
      change_status("banned", "activated")
    end

    def change_status(from, to)
      if @client.status == from
        @client.status = to
        @client.save!
      end
      render json: @client
    end

    private
      def client_params
        params.require(:client).permit(:last_name, :first_name, :middle_name, :birth_at)
      end
      def set_client
        @client = Client.find(params[:id])
      end
  end
end
