class CreateAnalyses < ActiveRecord::Migration[5.0]
  def change
    create_table :analyses do |t|
      t.integer :client_id
      t.integer :transaction_category_id
      t.integer :year
      t.integer :month
      t.string :currency
      t.decimal :amount, default: 0
      t.integer :total_transactions, default: 0

      t.timestamps
    end
  end
end
