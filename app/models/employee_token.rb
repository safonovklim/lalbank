class EmployeeToken < ApplicationRecord
  belongs_to :employee
  after_initialize :init

  private
    def random_string(length=10)
      chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
      password = ''
      length.times { password << chars[rand(chars.size)] }
      password
    end
    def init
      self.expire_at = Time.now + 1.day
      loop do
        self.token = random_string(64)
        break self.token unless EmployeeToken.exists?(token: self.token)
      end
    end
end
