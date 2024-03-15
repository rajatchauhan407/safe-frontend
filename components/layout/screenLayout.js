import {Box} from '@gluestack-ui/themed';

function ScreenLayout({children}) {
    return (
        <Box
        flex={1}
        bg="#F8F8FF"
        p={24}
        >
        {children}
        </Box>
    );
}

export default ScreenLayout;