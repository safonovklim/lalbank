class CreateBankAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :bank_accounts do |t|
      t.integer :client_id
      t.string :currency
      t.decimal :amount
      t.integer :type
      t.boolean :is_blocked
      t.boolean :is_hidden

      t.timestamps
    end
  end
end
