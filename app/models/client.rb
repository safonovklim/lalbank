class Client < ApplicationRecord
  has_many :bank_accounts
  has_many :client_tokens

  enum status: [:not_approved, :activated, :banned]

  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :birth_at, presence: true
  validates :username, presence: true, uniqueness: true, length: {in: 6..18}

  has_secure_password

  def as_json(options = {})
    super(options.merge({ except: [:password_digest] }))
  end
end
