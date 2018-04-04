export const getConviteDetalhesEventoObject = {
    'success': true,
    'msg': {
        'event': {
            'id': 34,
            'name': 'ABC',
            'description': '',
            'start_datetime': '2018-03-28T12:00:00',
            'end_datetime': '2018-03-29T12:00:00'
        },
        'invitations': {
            'invited': [
                {
                    'user__id': 3,
                    'user__first_name': 'Jefferson',
                    'user__last_name': 'Cardozo'
                },
                {
                    'user__id': 4,
                    'user__first_name': 'Jefferson 2',
                    'user__last_name': 'Cardozo 2'
                }
                ],
            'subscribed': [
                {
                    'user__id': 2,
                    'user__first_name': 'aaa',
                    'user__last_name': 'aaaa'
                }
            ],
            'rejected': [],
        },
        'users': [
            {
                'id': 5,
                'text': 'Teste Testado'
            },
            {
                'id': 7,
                'text': 'Teste Testado'
            },
        ],
    }
};

export const postConviteAdicionarObject = {
    'success': true,
    'msg': ['Convite para o usuário 5 ao evento 18 criado com sucesso.']
};

export const getConviteListarObject = {
    'success': true,
    'msg': [
        {
            'event': {
                'id': 39,
                'name': 'Teste Teste Teste',
                'description': '',
                'start_datetime': '2018-03-11T12:00:00',
                'end_datetime': '2018-03-12T12:00:00'
            },
            'creator': 'aaa aaaa',
            'invite_id': 99
        },
        {
            'event': {
            'id': 30,
                'name': 'aaaaaaaa',
                'description': '',
                'start_datetime': '2018-04-02T12:00:00',
                'end_datetime': '2018-04-03T12:00:00'
            },
            'creator': 'aaa aaaa',
            'invite_id': 100
        },
        {
            'event': {
                'id': 40,
                'name': 'Convite Teste',
                'description': '',
                'start_datetime': '2018-04-16T12:00:00',
                'end_datetime': '2018-04-17T15:00:00'
            },
            'creator': 'aaa aaaa',
            'invite_id': 101
        },
    ],
};
