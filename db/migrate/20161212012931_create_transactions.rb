class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.integer :bank_account_id
      t.integer :status
      t.decimal :amount
      t.string :currency
      t.integer :transaction_category_id

      t.timestamps
    end
  end
end
