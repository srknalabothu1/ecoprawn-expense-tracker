
// URL Change
const URL = 'https://ecoprawnnodebe-ks53.vercel.app/api/users';
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log('User created:', data);
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
};

export const getUsers = async () => {
    try {
        const response = await fetch(`${URL}/getDetails`, {
            method: 'GET',
        });
        const data = await response.json();
       return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};



export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};
