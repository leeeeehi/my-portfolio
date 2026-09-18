import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--color-secondary)',
    borderRadius: 1,
  },
};

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼. 이름/메시지는 필수, 이메일/별점은 선택 입력입니다.
 *
 * Props:
 * @param {function} onSubmit - 방명록 등록 함수. { name, message, email, rating } 를 받아 성공 시 true 를 반환 [Required]
 * @param {boolean} isSubmitting - 등록 진행 중 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookForm onSubmit={addEntry} isSubmitting={isSubmitting} />
 */
function GuestbookForm({ onSubmit, isSubmitting = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      setFeedback({ type: 'error', text: '이름과 메시지를 입력해주세요.' });
      return;
    }

    const success = await onSubmit({
      name: name.trim(),
      message: message.trim(),
      email: email.trim(),
      rating,
    });

    if (success) {
      setName('');
      setEmail('');
      setMessage('');
      setRating(0);
      setFeedback({ type: 'success', text: '방명록이 등록되었어요. 감사합니다!' });
    } else {
      setFeedback({ type: 'error', text: '등록에 실패했어요. 잠시 후 다시 시도해주세요.' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, color: 'var(--color-secondary)', fontWeight: 700 }}
      >
        방명록 남기기
      </Typography>

      <TextField
        label="이름"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        size="small"
        sx={textFieldSx}
      />
      <TextField
        label="이메일 (선택, 비공개)"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        size="small"
        sx={textFieldSx}
      />
      <TextField
        label="메시지"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        multiline
        minRows={3}
        size="small"
        sx={textFieldSx}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>별점</Typography>
        <Rating
          value={rating}
          onChange={(_event, newValue) => setRating(newValue)}
          sx={{ color: 'var(--color-accent)' }}
        />
      </Box>

      {feedback && (
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: feedback.type === 'error' ? '#E8967A' : 'var(--color-secondary)',
          }}
        >
          {feedback.text}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          alignSelf: 'flex-start',
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-primary)',
          '&:hover': { backgroundColor: 'var(--color-link-hover)' },
        }}
      >
        {isSubmitting ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : '등록하기'}
      </Button>
    </Box>
  );
}

export default GuestbookForm;
