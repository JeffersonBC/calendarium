export const getUsuarioLogadoObject = {
  'success': true,
  'msg': {
    'id': 1,
    'username': 'Teste',
    'email': 'teste@teste.com',
    'first_name': 'Teste',
    'last_name': 'Testado',
    'password': 'pbkdf2_sha256$100000$UDlCdMqw0t3R$D5fkuw0SfabyI6QKITBTgmGr6ipD9G3ddc+QZ+Mlg2E=',
    'is_active': true,
    'is_staff': false,
    'is_superuser': false
  }
};

export const postLoginObject = {
  'token': 'ad2ae62a7828be96ca4d10ea57563dc9988dc300'
};

export const postLoginObjectFailure = {
  'error': {
    'non_field_errors': [
      'Impossível fazer login com as credenciais fornecidas.'
    ],
  }
};
