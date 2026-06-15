import { ArrowButton } from 'src/ui/arrow-button';
import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onSubmit: (styles: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
	});

	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(newValue) =>
							setFormState({ ...formState, fontFamilyOption: newValue })
						}
						title='Шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(newValue) =>
							setFormState({ ...formState, fontSizeOption: newValue })
						}
						title='Размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(newValue) =>
							setFormState({ ...formState, fontColor: newValue })
						}
						title='Цвет шрифта'></Select>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(newValue) =>
							setFormState({ ...formState, backgroundColor: newValue })
						}
						title='Цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(newValue) =>
							setFormState({ ...formState, contentWidth: newValue })
						}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => handleReset()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
