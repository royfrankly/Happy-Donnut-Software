import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Search, Edit, Trash2, Plus, Save, X, Tags, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";
import {
  getCategorias,
  saveCategorias,
  addCategoria,
  deleteCategoria,
  getNextId,
  getProductos,
  type Categoria,
} from "../../lib/storage";

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newCategoria, setNewCategoria] = useState<Categoria | null>(null);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [deletingCategoriaId, setDeletingCategoriaId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = () => {
    const categoriasData = getCategorias();
    const productos = getProductos();
    
    // Filtrar solo categorías de Producto y calcular itemsCount dinámicamente
    const categoriasProducto = categoriasData
      .filter(cat => cat.tipo === "Producto")
      .map(cat => {
        const count = productos.filter(p => p.categoria === cat.nombre).length;
        return { ...cat, itemsCount: count };
      });
    
    setCategorias(categoriasProducto);
  };

  const filteredCategorias = categorias.filter(cat => 
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria({ ...categoria });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingCategoria) {
      if (!editingCategoria.nombre.trim()) {
        toast.error("El nombre de la categoría es obligatorio");
        return;
      }
      
      // Obtener todas las categorías incluyendo insumos
      const todasCategorias = getCategorias();
      const updatedCategorias = todasCategorias.map(cat =>
        cat.id === editingCategoria.id ? editingCategoria : cat
      );
      saveCategorias(updatedCategorias);
      loadCategorias();
      setShowEditDialog(false);
      setEditingCategoria(null);
      toast.success("Categoría actualizada exitosamente");
    }
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingCategoria(null);
  };

  const handleNewCategoria = () => {
    const emptyCategoria: Categoria = {
      id: getNextId(getCategorias()),
      tipo: "Producto",
      nombre: "",
      descripcion: "",
      itemsCount: 0,
      estado: "Activa"
    };
    setNewCategoria(emptyCategoria);
    setShowNewDialog(true);
  };

  const handleSaveNewCategoria = () => {
    if (newCategoria) {
      if (!newCategoria.nombre.trim()) {
        toast.error("El nombre de la categoría es obligatorio");
        return;
      }
      
      // Verificar que no exista otra categoría de Producto con el mismo nombre
      const todasCategorias = getCategorias();
      const existe = todasCategorias.find(
        c => c.nombre.toLowerCase() === newCategoria.nombre.toLowerCase() && c.tipo === "Producto"
      );
      if (existe) {
        toast.error(`Ya existe una categoría de Producto con el nombre "${newCategoria.nombre}"`);
        return;
      }
      
      addCategoria(newCategoria);
      loadCategorias();
      setShowNewDialog(false);
      setNewCategoria(null);
      toast.success(`Categoría "${newCategoria.nombre}" creada exitosamente`);
    }
  };

  const handleCancelNewCategoria = () => {
    setShowNewDialog(false);
    setNewCategoria(null);
  };

  const handleDeleteClick = (id: number) => {
    const categoria = categorias.find(c => c.id === id);
    if (categoria && categoria.itemsCount > 0) {
      toast.error(`No se puede eliminar una categoría que tiene productos asociados`);
      return;
    }
    setDeletingCategoriaId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingCategoriaId) {
      const categoria = categorias.find(c => c.id === deletingCategoriaId);
      deleteCategoria(deletingCategoriaId);
      loadCategorias();
      setShowDeleteDialog(false);
      setDeletingCategoriaId(null);
      toast.success(`Categoría "${categoria?.nombre}" eliminada exitosamente`);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeletingCategoriaId(null);
  };

  const updateEditingCategoria = (field: keyof Categoria, value: any) => {
    if (editingCategoria) {
      setEditingCategoria({ ...editingCategoria, [field]: value });
    }
  };

  const updateNewCategoria = (field: keyof Categoria, value: any) => {
    if (newCategoria) {
      setNewCategoria({ ...newCategoria, [field]: value });
    }
  };

  const totalCategorias = categorias.length;
  const categoriasActivas = categorias.filter(c => c.estado === "Activa").length;
  const totalProductos = categorias.reduce((sum, c) => sum + c.itemsCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Categorías de Productos</h1>
          <p className="text-muted-foreground">Gestión de categorías para productos</p>
        </div>
        <Button onClick={handleNewCategoria}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Tags className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl">{totalCategorias}</div>
                <p className="text-sm text-muted-foreground">Total Categorías</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl text-green-600">{totalProductos}</div>
                <p className="text-sm text-muted-foreground">Total Productos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary">✓</span>
              </div>
              <div>
                <div className="text-2xl text-primary">{categoriasActivas}</div>
                <p className="text-sm text-muted-foreground">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">N° Productos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategorias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No se encontraron categorías
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategorias.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.nombre}</TableCell>
                    <TableCell className="text-muted-foreground">{cat.descripcion}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{cat.itemsCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cat.estado === "Activa" ? "default" : "outline"}>
                        {cat.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(cat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteClick(cat.id)}
                          disabled={cat.itemsCount > 0}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo de Edición */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Modifica la información de la categoría
            </DialogDescription>
          </DialogHeader>
          {editingCategoria && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre de la Categoría</Label>
                <Input
                  id="edit-nombre"
                  value={editingCategoria.nombre}
                  onChange={(e) => updateEditingCategoria('nombre', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea
                  id="edit-descripcion"
                  value={editingCategoria.descripcion}
                  onChange={(e) => updateEditingCategoria('descripcion', e.target.value)}
                  rows={3}
                  placeholder="Describe brevemente esta categoría..."
                />
              </div>

              <div className="space-y-2">
                <Label>Estado</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={editingCategoria.estado === "Activa" ? "default" : "outline"}
                    onClick={() => updateEditingCategoria('estado', 'Activa')}
                    className="flex-1"
                  >
                    Activa
                  </Button>
                  <Button
                    type="button"
                    variant={editingCategoria.estado === "Inactiva" ? "default" : "outline"}
                    onClick={() => updateEditingCategoria('estado', 'Inactiva')}
                    className="flex-1"
                  >
                    Inactiva
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Productos asociados:</strong> {editingCategoria.itemsCount}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Nueva Categoría */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
            <DialogDescription>
              Agrega una nueva categoría de productos
            </DialogDescription>
          </DialogHeader>
          {newCategoria && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-nombre">Nombre de la Categoría</Label>
                <Input
                  id="new-nombre"
                  value={newCategoria.nombre}
                  onChange={(e) => updateNewCategoria('nombre', e.target.value)}
                  placeholder="Ej: Donas, Frapes, Bebidas, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-descripcion">Descripción</Label>
                <Textarea
                  id="new-descripcion"
                  value={newCategoria.descripcion}
                  onChange={(e) => updateNewCategoria('descripcion', e.target.value)}
                  rows={3}
                  placeholder="Describe brevemente esta categoría..."
                />
              </div>

              <div className="space-y-2">
                <Label>Estado</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newCategoria.estado === "Activa" ? "default" : "outline"}
                    onClick={() => updateNewCategoria('estado', 'Activa')}
                    className="flex-1"
                  >
                    Activa
                  </Button>
                  <Button
                    type="button"
                    variant={newCategoria.estado === "Inactiva" ? "default" : "outline"}
                    onClick={() => updateNewCategoria('estado', 'Inactiva')}
                    className="flex-1"
                  >
                    Inactiva
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  💡 Las categorías te ayudan a organizar mejor tu inventario de productos
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelNewCategoria}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSaveNewCategoria}>
              <Save className="mr-2 h-4 w-4" />
              Crear Categoría
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación de Eliminación */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La categoría será eliminada permanentemente del sistema.
              {deletingCategoriaId && (() => {
                const cat = categorias.find(c => c.id === deletingCategoriaId);
                return (
                  <span className="block mt-2">
                    <strong>Categoría: </strong>
                    {cat?.nombre}
                  </span>
                );
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
