class Employee < ApplicationRecord
  has_many :employee_tokens
  enum role: [:not_activated, :fired, :support_agent, :analyst, :security_staff, :founder]
  validates :username, presence: true, uniqueness: true, length: {in: 6..18}
  has_secure_password

  def as_json(options = {})
    super(options.merge({ except: [:password_digest] }))
  end
end
