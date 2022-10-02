import { Box } from '@mantine/core'

export const TableCard = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={theme => ({
      backgroundColor: theme.colors.dark[6],
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      margin: theme.spacing.md,
      height: 'calc(100vh - 120px)',
      overflowY: 'scroll',
    })}>
    {children}
  </Box>
)

export const StyledBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={theme => ({
      backgroundColor: theme.colors.dark[6],
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      margin: theme.spacing.md,
    })}>
    {children}
  </Box>
)

/* <TextInput
        placeholder='Search by any field'
        mb='md'
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      /> */
