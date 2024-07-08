import { Button } from '@nextui-org/button';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <Button color="danger" onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </Button>
  );
};

export default LogoutButton;
