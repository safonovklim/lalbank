module AdminApi::V1
  class ClientTokenController < ApiController
    def create
      client = Client.find_by_username(params[:username])
      if client && client.authenticate(params[:password])
        if client.status == "not_approved"
          render json: {
              :authorized => false,
              :message => 'Your profile isn\'t approved yet'
          }, :status => :forbidden
        elsif client.status == "banned"
          render json: {
              :authorized => false,
              :message => 'Your profile has been banned'
          }, :status => :forbidden
        else
          token = ClientToken.new
          token.client_id = client.id
          token.save!
          render json: {
              :authorized => true,
              token: {
                  value: token.token,
                  expire_at: token.expire_at
              }
          }
        end

      else
        render json: {
            :authorized => false,
            :message => 'Unknown username/password'
        }, :status => 404
      end
    end
  end
end
