module Api::V1
  class ApiController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods

    # now paste this where should be protected
    # before_action: authenticate_employee

    protected
      def authenticate_client
        authenticate_client_token || render_unauthorized
      end
      def authenticate_client_token
        authenticate_with_http_token do |token, options|
          c_token = ClientToken.find_by_token(token)
          if !c_token.blank? && c_token.expire_at > Time.now
            client = c_token.client
            if !(client['status'] == "not_approved" or client['status'] == "banned")
              @current_client = client
            end
          end

        end
      end

      def render_unauthorized
        render json: {
            authorized: false,
            message: 'Unauthorized'
        }, status: :unauthorized
      end
  end
end
