'use client';
import css from './NotesFilterList.module.css';
import InfoMessage from '@/components/InformMessage/InfoMessage';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/clientApi';
import { TagType } from '@/types/note';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';

type NotesFilterListClientProps = {
  tag: TagType;
};

const NotesFilterListClient = ({ tag }: NotesFilterListClientProps) => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [search] = useDebounce(searchQuery, 1000);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', { page: page, tag: tag, search: search }],
    queryFn: () =>
      (tag as string) === 'all'
        ? fetchNotes(search, page)
        : fetchNotes(search, page, 12, tag as TagType),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const handleSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const handleChangePage = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const totalPages = data?.totalPages || 1;
  if (isError) return <p>error</p>;

  return (
    <>
      <div className={css.noteUtilsThumb}>
        <Link href="/notes/action/create" className={css.createNoteLinkBtn}>
          Create note +
        </Link>
        <SearchBox
          searchValue={searchQuery}
          handleSearchNoteInput={handleSearchNoteInput}
          isLoading={isLoading}
        />
      </div>
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#3483f8"
          secondaryColor="#3483f8"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperClass={css.MutatingDotsWrapper}
        />
      ) : data && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />
          {totalPages > 1 && (
            <Pagination
              page={page}
              handleChangePage={handleChangePage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <InfoMessage />
      )}
    </>
  );
};

export default NotesFilterListClient;
