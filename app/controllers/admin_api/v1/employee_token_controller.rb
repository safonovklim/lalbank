module AdminApi::V1
  class EmployeeTokenController < ApiController
    def create
      @employee = Employee.find_by_username(params[:username])
      if @employee && @employee.authenticate(params[:password])
        if @employee.role == "not_activated"
          render json: {
              :authorized => false,
              :message => 'Employee profile not activated'
          }, :status => :forbidden
        elsif @employee.role == "fired"
          render json: {
              :authorized => false,
              :message => 'You has been fired'
          }, :status => :forbidden
        else
          @token = EmployeeToken.new
          @token.employee_id = @employee.id
          @token.save!
          render json: {
              :authorized => true,
              token: {
                  value: @token.token,
                  expire_at: @token.expire_at
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
