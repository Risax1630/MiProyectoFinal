document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users') //Enlazar la api de usuarios
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                li.dataset.userId = user.id;
                li.onclick = () => selectUser(user.id);
                userList.appendChild(li);
            });
        });
}

function selectUser(userId) {
    const selectedUser = document.querySelectorAll('#user-list li');
    selectedUser.forEach(user => {
        user.classList.remove('selected');
        if (user.dataset.userId == userId) {
            user.classList.add('selected');
        }
    });
    document.getElementById('task-list').dataset.userId = userId;
}

function addTask() {  
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const userId = taskList.dataset.userId;

    if (taskInput.value.trim() === '') {
        alert('Por favor, ingresa una tarea.');  //Validar Ingresar una Tarea
        return;
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskInput.value;

    const status = document.createElement('span');
    status.className = 'status creada'; //Tarea creada
    status.textContent = 'Creada';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar'; //Eliminar Tarea
    deleteButton.onclick = function () {
        taskList.removeChild(li);
    };

    const statusButton = document.createElement('button');
    statusButton.textContent = 'Cambiar Estado'; //Cambiar estados de la Tarea
    statusButton.onclick = function () {
        switch (status.textContent) {
            case 'Creada':
                status.className = 'status en-progreso'; // Creada
                status.textContent = 'En progreso';
                break;
            case 'En progreso':
                status.className = 'status terminada';   // En proceso
                status.textContent = 'Terminada';
                break;
            case 'Terminada':
                status.className = 'status pausada';  //Terminada
                status.textContent = 'Pausada';
                break;
            case 'Pausada':
                status.className = 'status creada';   //En Pausa
                status.textContent = 'Creada';
                break;
        }
    };

    li.appendChild(span);
    li.appendChild(status);
    li.appendChild(statusButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
}
