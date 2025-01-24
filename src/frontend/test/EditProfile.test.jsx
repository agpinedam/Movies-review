import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditProfile from '../EditProfile';

describe('EditProfile Component', () => {
    beforeEach(() => {
        // Simulate a user saved in the localStorage
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: 1,
                about: 'A propos de moi',
                photo: 'https://example.com/photo.jpg',
                phone: '123456789',
                address: '123 Rue Exemple',
            })
        );
    });

    afterEach(() => {
        // Clean the localStorage after every test
        localStorage.clear();
    });

    test('debe renderizar el formulario de edición con datos precargados', () => {
        render(
            <MemoryRouter>
                <EditProfile />
            </MemoryRouter>
        );

        // Verifica que los campos están precargados con los valores del usuario
        expect(screen.getByLabelText(/À propos/i).value).toBe('A propos de moi');
        expect(screen.getByLabelText(/Photo \(URL\)/i).value).toBe('https://example.com/photo.jpg');
        expect(screen.getByLabelText(/Numéro de téléphone/i).value).toBe('123456789');
        expect(screen.getByLabelText(/Adresse/i).value).toBe('123 Rue Exemple');
    });

    test('debe mostrar un mensaje de error si la URL de la foto no es válida', async () => {
        render(
            <MemoryRouter>
                <EditProfile />
            </MemoryRouter>
        );

        // Cambia la URL de la foto por un valor inválido
        const photoInput = screen.getByLabelText(/Photo \(URL\)/i);
        fireEvent.change(photoInput, { target: { value: 'invalid-url' } });

        // Simula el envío del formulario
        const submitButton = screen.getByRole('button', { name: /Mettre à jour/i });
        fireEvent.click(submitButton);

        // Verifica que se muestra el mensaje de error
        expect(await screen.findByText(/Le format de votre fichier n’est pas reconnu./i)).toBeInTheDocument();
    });

    test('debe enviar los datos correctamente al actualizar el perfil', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ user: { id: 1, about: 'Updated info' } }),
            })
        );

        render(
            <MemoryRouter>
                <EditProfile />
            </MemoryRouter>
        );

        // Cambia un campo del formulario
        const aboutInput = screen.getByLabelText(/À propos/i);
        fireEvent.change(aboutInput, { target: { value: 'Updated info' } });

        // Simula el envío del formulario
        const submitButton = screen.getByRole('button', { name: /Mettre à jour/i });
        fireEvent.click(submitButton);

        // Verifica que fetch fue llamado con los datos correctos
        expect(fetch).toHaveBeenCalledWith('/api/profile/1', expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expect.objectContaining({ about: 'Updated info' })),
        }));

        // Verifica que el mensaje de éxito se muestra
        expect(await screen.findByText(/Profil mis à jour avec succès/i)).toBeInTheDocument();
    });

    test('debe mostrar un mensaje de error si la actualización falla', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Erreur lors de la mise à jour' }),
            })
        );

        render(
            <MemoryRouter>
                <EditProfile />
            </MemoryRouter>
        );

        // Simula el envío del formulario
        const submitButton = screen.getByRole('button', { name: /Mettre à jour/i });
        fireEvent.click(submitButton);

        // Verifica que el mensaje de error se muestra
        expect(await screen.findByText(/Erreur lors de la mise à jour/i)).toBeInTheDocument();
    });
});
