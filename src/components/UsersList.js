import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import useThunk from '../hooks/useThunk';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={10} className='h-10 w-full' />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map(user => <UsersListItem user={user} key={user.id} />);
  }

  return (
    <div>
      <div className='flex flex-row justify-between m-3 items-center'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && 'Error creating user'}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
