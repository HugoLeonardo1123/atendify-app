import axios from 'axios';
import { CALENDLY_TOKEN, BASE_URL } from '@env';

export const getUserUri = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${CALENDLY_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.resource.uri;
  } catch (error: any) {
    console.error(
      'Error fetching user URI:',
      error.response?.data || error.message,
    );
    return null;
  }
};

export const getUserAvailability = async (userUri: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user_availability_schedules`,
      {
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          'Content-Type': 'application/json',
        },
        params: { user: userUri },
      },
    );

    return response.data.collection;
  } catch (error: any) {
    console.error(
      'Error fetching user availability:',
      error.response?.data || error.message,
    );
    return [];
  }
};
