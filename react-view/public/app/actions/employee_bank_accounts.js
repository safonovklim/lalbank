import api from '../helpers/api';
let my_api = api();

export const E_GET_BANK_ACCOUNTS_OK = 'E_GET_BANK_ACCOUNTS_OK'
export const E_GET_BANK_ACCOUNTS_FAILED = 'E_GET_BANK_ACCOUNTS_FAILED'

export function get_bank_accounts(client_id) {
    return function (dispatch) {
        Promise.all([
            my_api.get("api/v1/clients/" + client_id + '/bank_accounts'),
            my_api.get("api/v1/clients/" + client_id + '/cards')
        ])
            .then((response) => {
                console.log(response)
                let ba = response[0].data.bank_accounts; // bank accounts
                let bc = response[1].data.cards; // cards

                let result = [];

                ba.forEach((account) => {
                    let linked_cards = []
                    bc.forEach((card) => {
                        if (card.bank_account_id == account.id) {
                            linked_cards.push(card)
                        }
                    })
                    account['cards'] = linked_cards
                    result.push(account)
                })

                console.log(result)

                dispatch({
                    type: E_GET_BANK_ACCOUNTS_OK,
                    data: {
                        response: result,
                        requested: {
                            client_id: client_id
                        }
                    }
                })
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: E_GET_BANK_ACCOUNTS_FAILED,
                    data: {
                        handle: err,
                        message: err.response.data.message
                    }
                })
            })
    }
}