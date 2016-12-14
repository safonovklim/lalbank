class Analysis < ApplicationRecord
  has_one :transaction_category
  belongs_to :client

  def init
    dt = Time.now
    self.year = dt.year
    self.month = dt.month
  end
end
