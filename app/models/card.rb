class Card < ApplicationRecord
  belongs_to :bank_account
  validates :number, length: { is: 16 }
end
