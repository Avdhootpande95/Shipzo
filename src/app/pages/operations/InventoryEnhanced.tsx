import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Package, ShieldCheck, Thermometer, Calendar, MapPin, X, Edit, Trash2 } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  batch: string;
  cert: string;
  temp: string;
  quantity: number;
  expiry: string;
  warehouse: string;
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: 'mRNA Lipid Nanoparticle', batch: 'LNP-2024-001', cert: 'GMP', temp: '−70°C', quantity: 250, expiry: '2027-06-15', warehouse: 'Singapore Hub' },
  { id: 2, name: 'Vaccine Adjuvant MF59', batch: 'VAC-2024-045', cert: 'GMP', temp: '2–8°C', quantity: 180, expiry: '2026-12-20', warehouse: 'Frankfurt Center' },
  { id: 3, name: 'Monoclonal Antibody Solution', batch: 'MAB-2024-023', cert: 'GDP', temp: '2–8°C', quantity: 95, expiry: '2027-03-10', warehouse: 'Boston Facility' },
  { id: 4, name: 'Lyophilized Protein Powder', batch: 'LPP-2024-067', cert: 'GMP', temp: '−20°C', quantity: 320, expiry: '2028-01-05', warehouse: 'Tokyo Storage' },
];

export function InventoryEnhanced() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleUpdate = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setInventory(inventory.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
    }
  };

  const handleRemove = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
    setDeleteConfirm(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem: InventoryItem = {
      id: Math.max(...inventory.map(i => i.id)) + 1,
      name: formData.get('material') as string,
      batch: formData.get('batch') as string,
      cert: formData.get('cert') as string,
      temp: formData.get('temp') as string,
      quantity: Number(formData.get('quantity')),
      expiry: formData.get('expiry') as string,
      warehouse: formData.get('warehouse') as string,
    };
    setInventory([...inventory, newItem]);
    setShowAddForm(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-muted-foreground">Manage pharmaceutical materials and supplies</p>
        </div>
        <Button 
          className="rounded-xl bg-primary hover:bg-primary/90"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="rounded-2xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Add New Inventory Item</CardTitle>
            <CardDescription>Enter material details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material Name</Label>
                <Input id="material" name="material" placeholder="e.g., mRNA Vaccine" className="rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch Number</Label>
                <Input id="batch" name="batch" placeholder="e.g., BATCH-2024-001" className="rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert">Certification Type</Label>
                <Select name="cert" required>
                  <SelectTrigger id="cert" className="rounded-xl">
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMP">GMP</SelectItem>
                    <SelectItem value="GDP">GDP</SelectItem>
                    <SelectItem value="GMP & GDP">GMP & GDP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temp">Storage Temperature</Label>
                <Select name="temp" required>
                  <SelectTrigger id="temp" className="rounded-xl">
                    <SelectValue placeholder="Select temperature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2–8°C">2–8°C</SelectItem>
                    <SelectItem value="−20°C">−20°C</SelectItem>
                    <SelectItem value="−70°C">−70°C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Available</Label>
                <Input id="quantity" name="quantity" type="number" placeholder="e.g., 250" className="rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" name="expiry" type="date" className="rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse Location</Label>
                <Input id="warehouse" name="warehouse" placeholder="e.g., Singapore Hub" className="rounded-xl" required />
              </div>
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" className="rounded-xl bg-primary hover:bg-primary/90">
                  Add to Inventory
                </Button>
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Inventory Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {inventory.map((item) => (
          <Card key={item.id} className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-xl p-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Batch: {item.batch}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-lg">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    {item.cert}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Storage Temp</span>
                    </div>
                    <p className="font-semibold">{item.temp}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">Quantity</span>
                    </div>
                    <p className="font-semibold text-green-600">{item.quantity} units</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Expiry</span>
                    </div>
                    <p className="font-semibold">{item.expiry}</p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="text-xs text-muted-foreground">Location</span>
                    </div>
                    <p className="font-semibold text-sm">{item.warehouse}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-lg"
                    onClick={() => handleUpdate(item)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Update
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-lg text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => setDeleteConfirm(item.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl rounded-2xl border-2">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Update Inventory Item</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingItem(null)}
                  className="rounded-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSaveUpdate} className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Material Name</Label>
                  <Input 
                    value={editingItem.name} 
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Batch Number</Label>
                  <Input 
                    value={editingItem.batch} 
                    onChange={(e) => setEditingItem({...editingItem, batch: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input 
                    type="number"
                    value={editingItem.quantity} 
                    onChange={(e) => setEditingItem({...editingItem, quantity: Number(e.target.value)})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input 
                    type="date"
                    value={editingItem.expiry} 
                    onChange={(e) => setEditingItem({...editingItem, expiry: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Warehouse Location</Label>
                  <Input 
                    value={editingItem.warehouse} 
                    onChange={(e) => setEditingItem({...editingItem, warehouse: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>
                <div className="flex gap-2 md:col-span-2">
                  <Button type="submit" className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setEditingItem(null)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Confirm Removal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to remove this item from inventory? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  className="flex-1 rounded-xl"
                  onClick={() => handleRemove(deleteConfirm)}
                >
                  Remove Item
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
