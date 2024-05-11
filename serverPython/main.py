from flask import Flask, request, jsonify, send_file, render_template
import sqlite3
import jwt
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создание базы данных SQLite и таблицы пользователей
conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY, email TEXT, password TEXT, rememberMe INTEGER, status TEXT, captcha TEXT)''')
conn.commit()
conn.close()

# Создание базы данных SQLite и таблицы заметок
conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS notes
             (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, text TEXT, status TEXT, creator TEXT)''')
conn.commit()
conn.close()


def generate_token(user_id):
    payload = {'user_id': user_id}
    token = jwt.encode(payload, 'secret_key_1234', algorithm='HS256')
    return token


# Регистрация нового пользователя
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    remember_me = data.get('rememberMe', 0)
    status = data.get('status', 'active')
    captcha = data.get('captcha', '')

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO users (email, password, rememberMe, status, captcha) VALUES (?, ?, ?, ?, ?)",
              (email, password, remember_me, status, captcha))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'})


# Вход пользователя
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
    user = c.fetchone()
    conn.close()

    if user:
        # Если пользователь найден, генерируем JWT токен и возвращаем его
        token = generate_token(user[0])  # Передаем user_id для включения в payload токена
        return jsonify({'message': 'Login successful', 'token': token})
    else:
        return jsonify({'message': 'Invalid email or password'})


# Получение всех заметок для пользователя
@app.route('/api/todo/get-notes', methods=['GET'])
def get_notes():
    current_user_email = request.headers.get('Authorization')

    if (current_user_email != 'null'):
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM notes WHERE creator=?", (current_user_email,))
        notes = c.fetchall()
        conn.close()
        return jsonify({'notes': notes})

    else:
        return jsonify({'errors': ['id or email failed!']})


# Добавление заметки
@app.route('/api/todo/add-note', methods=['POST'])
def add_note():
    data = request.get_json()
    user_id = data['user_id']
    title = data['title']
    text = data['text']
    status = data.get('status', 'pending')

    # Получаем адрес электронной почты текущего пользователя из localStorage
    current_user_email = request.headers.get('Authorization')  # Здесь вы можете добавить логику для извлечения токена и получения адреса электронной почты из localStorage

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO notes (user_id, title, text, status, creator) VALUES (?, ?, ?, ?, ?)",
              (user_id, title, text, status, current_user_email))
    conn.commit()
    conn.close()
    # Подключение к базе данных
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Выполнение запроса SELECT
    c.execute("SELECT * FROM notes")

    # Получение результатов запроса
    rows = c.fetchall()

    # Вывод результатов в терминале
    for row in rows:
        print(row)

    # Закрытие соединения с базой данных
    conn.close()
    return jsonify({'message': 'Note added successfully'})


# Удаление заметки
@app.route('/api/todo/delete-note', methods=['DELETE'])
def delete_note():
    note_id = request.args.get('note_id')

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("DELETE FROM notes WHERE id=?", (note_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Note deleted successfully'})


# Обновление данных существующей заметки
@app.route('/api/todo/update-note', methods=['PUT'])
def update_note():
    data = request.get_json()
    note_id = data['id']
    title = data['title']
    text = data['text']
    status = data.get('status', 'pending')

    # Получаем адрес электронной почты текущего пользователя из заголовка запроса
    current_user_email = request.headers.get('Authorization')

    # Проверяем, что пользователь аутентифицирован
    if not current_user_email:
        return jsonify({'error': 'Unauthorized user'}), 401

    # Соединяемся с базой данных
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Проверяем, принадлежит ли заметка текущему пользователю
    c.execute("SELECT * FROM notes WHERE id=? AND creator=?", (note_id, current_user_email))
    note = c.fetchone()
    if not note:
        conn.close()
        return jsonify({'error': 'Note not found or does not belong to the current user'}), 404

    # Обновляем данные заметки
    c.execute("UPDATE notes SET title=?, text=?, status=? WHERE id=? AND creator=?",
              (title, text, status, note_id, current_user_email))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Note updated successfully'})


# Получение информации о текущем пользователе
@app.route('/api/auth/me', methods=['GET'])
def get_current_user():
    # В реальном приложении здесь должна быть проверка аутентификации пользователя
    # и получение данных о текущем пользователе на основе сессии или токена.

    # В данном примере просто возвращается заглушечный ответ
    # Предполагается, что пользователь уже аутентифицирован и его ID передается в запросе
    user_id = request.args.get('id')
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE id=?", (user_id,))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({'user': user})
    else:
        return jsonify({'message': 'User not found'})


@app.route('/api/auth/logout', methods=['POST'])
def logout():
    # Получаем токен из заголовка запроса
    token = request.headers.get('Authorization')

    # Проверяем, есть ли токен
    if token is None:
        return jsonify({'message': 'No token provided'}), 400

    try:
        # Пытаемся декодировать токен
        payload = jwt.decode(token, 'secret_key_1234', algorithms=['HS256'])
        # Тут может быть дополнительная логика, если необходимо

        # Возвращаем ответ об успешном выходе из системы
        return jsonify({'message': 'Logged out successfully'}), 200
    except jwt.ExpiredSignatureError:
        # Если токен просрочен
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        # Если токен недействителен
        return jsonify({'message': 'Invalid token'}), 401


# Домашняя страница с документацией по API
@app.route('/', methods=['GET'])
def home():
    # Возвращает содержимое файла doc.html
    return send_file('doc.html')

if __name__ == '__main__':
    app.run(debug=True)
