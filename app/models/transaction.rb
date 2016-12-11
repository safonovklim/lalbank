class Transaction < ApplicationRecord
  belongs_to :bank_account
  has_one :transaction_category
  enum main_category: [:withdrawal, :c2c, :pos]
end
