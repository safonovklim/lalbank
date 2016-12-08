class Client < ApplicationRecord
  has_many :bank_accounts
  after_initialize :init

  enum status: [:not_approved, :active, :banned]
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :birth_at, presence: true

  def init
    self.status = :not_approved
  end
end
