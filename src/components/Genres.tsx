import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { connect, useDispatch, useSelector } from 'react-redux';
import { clearSelect, setGenres } from '../redux/actions/genre.actions';
import { bindActionCreators } from 'redux';
import { State } from '../redux/reducers/root-reducer';
import { OutlinedInput } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '13rem',
    },
  },
};

const genres = [
  'action',
  'adventure',
  'action & adventure',
  'animation',
  'biography',
  'comedy',
  'crime',
  'documentary',
  'drama',
  'fantasy',
  'horror',
  'romance',
  'musical',
  'mystery',
  'science fiction',
  'sci-fi & fantasy',
  'thriller',
];

const Genres = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const list: string[] = [];
  const dispatch = useDispatch();
  bindActionCreators(setGenres, dispatch);
  const genreList = useSelector((state: State) => state.genres);

  const handleChange = (event: SelectChangeEvent<typeof genreList>) => {
    const {
      target: { value },
    } = event;
    dispatch(setGenres(typeof value === 'string' ? value.split(', ') : value));
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearSelect());
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: '13rem',
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Select
          sx={{
            width: '90%',
          }}
          multiple
          displayEmpty
          open={open}
          onOpen={handleOpen}
          value={genreList.genres || list}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Genre</em>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value=''>
            <em>Genre</em>
          </MenuItem>
          {genres.map((gen) => (
            <MenuItem key={gen} value={gen}>
              {gen}
            </MenuItem>
          ))}
        </Select>
        <button onClick={handleClick}>X</button>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  genres: state.genres.genres,
});

export default connect(mapStateToProps, { setGenres, clearSelect })(Genres);
