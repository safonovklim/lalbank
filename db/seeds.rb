# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


TransactionCategory.create(id: 1, name: "Unknown")
TransactionCategory.create(id: 2, name: "Not applicable")

TransactionCategory.create(id: 3, name: "Income remittance")
TransactionCategory.create(id: 4, name: "Outcome remittance")
TransactionCategory.create(id: 5, name: "Cash withdrawal")
TransactionCategory.create(id: 6, name: "Cash-in")

TransactionCategory.create(id: 7, name: "Food")
TransactionCategory.create(id: 8, name: "Restaurants")
TransactionCategory.create(id: 9, name: "Transit")
TransactionCategory.create(id: 10, name: "Pharmacy")
TransactionCategory.create(id: 11, name: "Internet/Mobile phone")
TransactionCategory.create(id: 12, name: "Goods for home")
TransactionCategory.create(id: 13, name: "Clothes")
TransactionCategory.create(id: 14, name: "Shoes")
TransactionCategory.create(id: 15, name: "Pet shop")
TransactionCategory.create(id: 16, name: "Cosmetics")
TransactionCategory.create(id: 17, name: "Software, music, video")
TransactionCategory.create(id: 18, name: "Services")
TransactionCategory.create(id: 19, name: "Bar")
TransactionCategory.create(id: 20, name: "Education")
TransactionCategory.create(id: 21, name: "For kids")
TransactionCategory.create(id: 22, name: "Gifts")
TransactionCategory.create(id: 23, name: "Cinema, theater, concert")
TransactionCategory.create(id: 24, name: "Sport")