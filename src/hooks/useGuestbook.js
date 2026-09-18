import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const ENTRY_LIMIT = 100;

/**
 * useGuestbook 훅
 * Contact 섹션 방명록의 목록 조회와 새 글 등록을 담당합니다.
 * (이메일은 guestbook_public 뷰에 포함되지 않아 비공개로 유지됩니다.)
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError, count } = await supabase
      .from('guestbook_public')
      .select('id, name, message, rating, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(ENTRY_LIMIT);

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setEntries(data ?? []);
      setTotalCount(count ?? (data ?? []).length);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = useCallback(async ({ name, message, email, rating }) => {
    setIsSubmitting(true);
    const { error: insertError } = await supabase.from('guestbook').insert({
      name,
      message,
      email: email || null,
      rating: rating || null,
    });
    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return false;
    }

    setError(null);
    await fetchEntries();
    return true;
  }, [fetchEntries]);

  return { entries, totalCount, isLoading, isSubmitting, error, addEntry };
}

export default useGuestbook;
