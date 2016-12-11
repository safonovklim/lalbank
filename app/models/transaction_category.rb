class TransactionCategory < ApplicationRecord
  belongs_to :transaction
  validates :name, presence: true, uniqueness: true
end
