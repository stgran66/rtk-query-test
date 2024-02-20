import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pause } from '../../utils/pause';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  // DEV ONLY !!!
  await pause(1000);

  return response.data;
});

export { fetchUsers };
