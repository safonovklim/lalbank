class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.integer :bank_account_id
      t.string :card_number
      t.integer :status
      t.date :expire_at
      t.string :pin_hash

      t.timestamps
    end
    add_index :cards, :card_number, :unique => true
  end
end
