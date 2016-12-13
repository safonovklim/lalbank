class Transaction < ApplicationRecord
  after_save :increase_counter_in_ba
  belongs_to :bank_account
  has_one :transaction_category

  enum status: [:completed, :declined]

  def increase_counter_in_ba
    if self.status == :completed
      self.bank_account.transactions_success += 1 # no increment in ruby lol
    else
      self.bank_account.transactions_failed -= 1
    end
    self.bank_account.save!
  end
end
