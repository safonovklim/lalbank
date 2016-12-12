class Transaction < ApplicationRecord
  belongs_to :bank_account
  has_one :transaction_category

  enum status: [:completed, :declined]
end
