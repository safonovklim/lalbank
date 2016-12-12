class CreateTransactionCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :transaction_categories do |t|
      t.string :name

      t.timestamps
    end
    add_index :transaction_categories, :name, :unique => true
  end
end
