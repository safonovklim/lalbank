require 'digest/sha1'

module Gateway::V1
  class GatewayController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods


    protected
      def authenticate(sender)
        if sender == "sexycard"
          is_sexycard? || render_unauthorized
        else
          render_unauthorized
        end
      end

      def is_sexycard?
        request.body.rewind
        v_input_json = request.body.read
        v_input_sign = request.headers['X-SexyCard-Signature']
        v_calculated_sign = Digest::SHA1.hexdigest("#{v_input_json}|#{Rails.application.secrets.gateway_sexycard}")


        # logger.info "Input signature #{v_input_sign}"
        # logger.info "Calculated signature #{v_calculated_sign}"
        # logger.info "Input JSON #{v_input_json}"

        if v_calculated_sign == v_input_sign
          @transaction = card_payment_parameters
        else
          render_unauthorized
        end
      end

      def card_payment_parameters
        params.require(:transaction).permit(:currency, :amount, :card_number, :expire_at, :pin_code, :category)
      end

      def render_unauthorized
        render json: {
            authorized: false,
            message: 'Unauthorized'
        }, status: :unauthorized
      end
  end
end
