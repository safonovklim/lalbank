module AdminApi::V1
  class ApiController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods

    protected
      def authenticate_employee(role = "all")
        if role == "all"
          authenticate_employee_token || render_unauthorized
        else
          employee = authenticate_employee_token

          if !(employee.blank?) && employee['role'] == role
            employee
          else
            render_unauthorized
          end
        end
      end

      def authenticate_employee_token
        authenticate_with_http_token do |token, options|
          employee_token = EmployeeToken.find_by_token(token)
          if !employee_token.blank? && employee_token.expire_at > Time.now
            employee = employee_token.employee
            if !(employee['role'] == "not_activated" or employee['role'] == "fired")
              @current_employee = employee
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
