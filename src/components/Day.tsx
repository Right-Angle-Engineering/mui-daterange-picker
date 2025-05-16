import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
}: DayProps) => {

  return (
    <Box
      sx={[{
        display: 'flex',
        backgroundColor: (theme) => !disabled && highlighted ? theme.palette.primary.light : undefined
      }, startOfRange ? {
        borderRadius: '50% 0 0 50%'
      } : {
        borderRadius: endOfRange ? '0 50% 50% 0' : undefined
      }]}
    >
      <IconButton
        sx={[{
          height: '36px',
          width: '36px',
          padding: 0,
          border: (theme) => !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined
        }, (!disabled && filled ? {
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
          backgroundColor: (theme) => theme.palette.primary.dark,
        } : {})]}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        // size="large"
      >
        <Typography
          sx={{
            lineHeight: 1.6,
            color: (theme) => !disabled
              ? (filled ? theme.palette.primary.contrastText : theme.palette.text.primary)
              : theme.palette.text.secondary,
          }}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Day;
