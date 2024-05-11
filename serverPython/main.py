from flask import Flask, request, jsonify, send_file
import sqlite3

app = Flask(__name__)
current_session = None

# Создание базы данных SQLite и таблицы пользователей
conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY, email TEXT, password TEXT, rememberMe INTEGER, status TEXT, captcha TEXT)''')
conn.commit()
conn.close()

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
        return jsonify({'message': 'Login successful', 'user': user})
    else:
        return jsonify({'message': 'Invalid email or password'})

# Получение всех заметок для пользователя
@app.route('/api/todo/get-notes', methods=['GET'])
def get_notes():
    user_id = request.args.get('user_id')

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM notes WHERE user_id=?", (user_id,))
    notes = c.fetchall()
    conn.close()

    return jsonify({'notes': notes})

# Добавление заметки
@app.route('/api/todo/add-note', methods=['POST'])
def add_note():
    data = request.get_json()
    user_id = data['user_id']
    title = data['title']
    text = data['text']
    status = data.get('status', 'pending')
    creator = data['creator']

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO notes (user_id, title, text, status, creator) VALUES (?, ?, ?, ?, ?)",
              (user_id, title, text, status, creator))
    conn.commit()
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
    note_id = data['note_id']
    title = data['title']
    text = data['text']
    status = data.get('status', 'pending')

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("UPDATE notes SET title=?, text=?, status=? WHERE id=?",
              (title, text, status, note_id))
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


# Эндпоинт для выхода из системы
@app.route('/api/auth/logout', methods=['POST'])
def logout():
    global current_session
    # Проверяем, есть ли текущая сессия
    if current_session is None:
        return jsonify({'message': 'No active session'}), 400

    # Логика для выхода из системы, например, очистка сессии
    current_session = None
    return jsonify({'message': 'Logged out successfully'}), 200

# Домашняя страница с документацией по API
@app.route('/', methods=['GET'])
def home():
    # Возвращает содержимое файла doc.html
    return send_file('doc.html')

if __name__ == '__main__':
    app.run(debug=True)
