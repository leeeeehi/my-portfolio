import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * useProjects 훅
 * Projects 탭에 표시할 프로젝트 목록을 조회합니다.
 * (게시된(is_published) 프로젝트만 sort_order 순으로 가져옵니다.)
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('id, title, description, tech_stack, detail_url, thumbnail_url, github_url, is_personal')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setProjects(data ?? []);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error };
}

export default useProjects;
