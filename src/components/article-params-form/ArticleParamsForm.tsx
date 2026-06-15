import { ArrowButton } from 'src/ui/arrow-button';
import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
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
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (styles: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	isOpen,
	setIsOpen,
	onSubmit,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const handleToggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
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
