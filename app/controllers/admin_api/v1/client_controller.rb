module AdminApi::V1
  class ClientController < ApiController
    before_action :authenticate_employee, only: [:index, :show, :update]
    before_action only: [:approve, :ban, :unban] {
      authenticate_employee("security_staff")
    }
    before_action :set_client, only: [:show, :update, :approve, :ban, :unban]

    def index
      list = Client
                 .order('created_at DESC')
                 .page(page_num)
                 .per_page(20)
      render json: {
          clients: list,
          per_page: 20
      }
    end

    def show
      render json: {
          client: @client
      }
    end

    def update
      if @client.update(client_params)
        render json: @client
      else
        render json: @client.errors, status: 400
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
      render json: {
          client: @client
      }
    end

    private
      def client_params
        params.require(:client).permit(:last_name, :first_name, :middle_name, :birth_at, :username, :password, :password_confirmation)
      end
      def page_num
        params.require(:page)
      end
  end
end
